import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

// Define a interface para o corpo da requisição
interface Task {
  task: string;
  public: boolean;
}

// Define a interface para o corpo da requisição
interface RequestBody {
  tasks: Task[];
}

// Função para lidar com POST requests
export async function POST(req: NextRequest) {
  try {
    // Verifica se o corpo da requisição é JSON
    const body: RequestBody = await req.json();

    // Inicia o Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Gere o HTML com base nas tarefas
    const tasksHtml = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
          }
          h1 {
            text-align: center;
          }
          .task {
            margin-bottom: 20px;
          }
          .task-public {
            color: red;
          }
        </style>
      </head>
      <body>
        <h1>Minhas Tarefas</h1>
        ${body.tasks.map(task => `
          <div class="task ${task.public ? 'task-public' : ''}">
            <p>${task.task}</p>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    await page.setContent(tasksHtml);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=tarefas.pdf',
      },
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
