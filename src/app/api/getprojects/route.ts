"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  closeDatabase,
  fetchProjectsFromDatabase,
  initDatabase,
} from "@/db/db"; // Путь к функции извлечения данных из базы

// Инициализируем базу данных при запуске сервера
initDatabase().catch((err) => {
  console.error("Не удалось инициализировать базу данных:", err);
  process.exit(1); // Завершаем процесс, если инициализация базы данных не удалась
});

export async function GET() {
  try {
    const news = await fetchProjectsFromDatabase(); // Извлекаем новости из базы данных

    return NextResponse.json(news);
  } catch (err) {
    console.error("Ошибка при получении проектов", err);
    return NextResponse.json(
      { error: "Не удалось получить проекты" },
      { status: 500 }
    );
  }
}

// Убедимся, что закрываем соединение с базой данных при завершении работы сервера
process.on("SIGINT", async () => {
  await closeDatabase();
  process.exit();
});
