import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent implements OnInit {
  messages: ChatMessage[] = [];
  inputMessage = '';
  isLoading = false;
  currentTab = 'chat';
  userId = 'default-user';

  analysisResult = '';
  isAnalyzing = false;

  reportResult = '';
  isGeneratingReport = false;

  quickQuestions = [
    '帮我分析一下销售趋势',
    '哪个分类的数据最好?',
    '预测一下下个月的数据',
    '给我一些数据优化建议'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // 组件初始化时加载历史记录
    this.loadHistory();
  }

  loadHistory() {
    this.http.get(`/api/ai/history?userId=${this.userId}`).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.messages = response.data.map((msg: any) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
            timestamp: new Date(msg.createdAt)
          }));
        }
        if (this.messages.length === 0) {
          this.addWelcomeMessage();
        }
      },
      error: () => {
        this.addWelcomeMessage();
      }
    });
  }

  addWelcomeMessage() {
    this.messages.push({
      role: 'assistant',
      content: '你好，我是你的数据智能助理。我可以帮你：\n\n1. 聊天对话\n2. 分析数据趋势\n3. 生成业务报告\n4. 回答数据相关问题\n\n请选择上方的功能开始体验吧！',
      timestamp: new Date()
    });
  }

  sendMessage() {
    if (!this.inputMessage.trim() || this.isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: this.inputMessage,
      timestamp: new Date()
    };
    this.messages.push(userMessage);
    const message = this.inputMessage;
    this.inputMessage = '';
    this.isLoading = true;

    this.http.post('/api/ai/chat', { message, userId: this.userId }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.messages.push({
            role: 'assistant',
            content: response.data,
            timestamp: new Date()
          });
        }
        this.isLoading = false;
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: '抱歉，发生了错误，请稍后重试。',
          timestamp: new Date()
        });
        this.isLoading = false;
      }
    });
  }

  clearHistory() {
    this.http.post('/api/ai/clear-history', { userId: this.userId }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.messages = [];
          this.addWelcomeMessage();
        }
      },
      error: () => {
        console.error('清空历史失败');
      }
    });
  }

  analyzeData() {
    this.isAnalyzing = true;
    this.analysisResult = '';

    this.http.post('/api/ai/analyze', {}).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.analysisResult = response.data;
        }
        this.isAnalyzing = false;
      },
      error: () => {
        this.analysisResult = '分析失败，请稍后重试。';
        this.isAnalyzing = false;
      }
    });
  }

  generateReport() {
    this.isGeneratingReport = true;
    this.reportResult = '';

    this.http.post('/api/ai/report', {}).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.reportResult = response.data;
        }
        this.isGeneratingReport = false;
      },
      error: () => {
        this.reportResult = '生成失败，请稍后重试。';
        this.isGeneratingReport = false;
      }
    });
  }

  askQuestion(question: string) {
    if (!question.trim()) return;

    this.inputMessage = question;
    this.currentTab = 'chat';
    this.sendMessage();
  }
}
