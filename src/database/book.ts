import { Prisma } from "../shared/Prisma";

type BookSchema = {
  title?: string,
  tags?: string,
  summary?: string,
  id?: number,
}
export class Book {

  constructor(
    public schema: BookSchema
  ) {};

  async create(): Promise<Book> {
    if (typeof this.schema.title === 'undefined') {
      throw new Error('Book.create(): Unexpected error: Book title is not defined.');
    }
    if (typeof this.schema.tags === 'undefined') {
      throw new Error('Book.create(): Unexpected error: Book tags is not defined.');
    }
    if (typeof this.schema.summary === 'undefined') {
      throw new Error('Book.create(): Unexpected error: Book summary is not defined.');
    }

    return new Book(
      await Prisma.book.create({
        data: {
          title: this.schema.title,
          tags: this.schema.tags,
          summary: this.schema.summary,
        }
      })
    );
  }

  static async readById(...id: number[]): Promise<Book[]> {
    const books = await Prisma.book.findMany({
      where: {
        id: {
          in: id
        }
      }
    });

    return books.map(book => new Book(book))
  }

  async readByTitle() {
    if (typeof this.schema.title === 'undefined') {
      throw new Error('Book.readByTitle(): Unexpected error: Book title is not defined.');
    }

    const books = await Prisma.book.findMany({
      where: {
        title: {
          contains: this.schema.title,
        },
      },
      select: {
        id: true,
      },
    });

    const bookIds: number[] = [];

    for (const book of books) {
      bookIds.push(book.id);
    }

    return bookIds;
  }

  async readByTags(): Promise<number[]> {
    if (typeof this.schema.tags === 'undefined') {
      throw new Error('Book.readByTags(): Unexpected error: Book tags is not defined.');
    }

    const books = await Prisma.book.findMany({
      where: {
        tags: {
          contains: this.schema.tags,
        },
      },
      select: {
        id: true,
      },
    });

    const bookIds: number[] = [];

    for (const book of books) {
      bookIds.push(book.id);
    }

    return bookIds;
  }

  async readBySummary(): Promise<number[]> {
    if (typeof this.schema.summary === 'undefined') {
      throw new Error('Book.readBySummary(): Unexpected error: Book summary is not defined.');
    }

    const books = await Prisma.book.findMany({
      where: {
        summary: {
          contains: this.schema.summary,
        },
      },
      select: {
        id: true,
      },
    });

    const bookIds: number[] = [];

    for (const book of books) {
      bookIds.push(book.id);
    }

    return bookIds;
  }

  async update(): Promise<Book> {
    if (typeof this.schema.id === 'undefined') {
      throw new Error('Book.update(): Unexpected error: Book ID is not defined.');
    }
    if (typeof this.schema.title === 'undefined') {
      throw new Error('Book.update(): Unexpected error: Book title is not defined.');
    }
    if (typeof this.schema.tags === 'undefined') {
      throw new Error('Book.update(): Unexpected error: Book tags is not defined.');
    }
    if (typeof this.schema.summary === 'undefined') {
      throw new Error('Book.update(): Unexpected error: Book summary is not defined.');
    }

    return new Book(
      await Prisma.book.update({
        where: { id: this.schema.id },
        data: {
          title: this.schema.title,
          tags: this.schema.tags,
          summary: this.schema.summary,
        },
      })
    );
  }

  async delete(): Promise<Book> {
    if (typeof this.schema.id === 'undefined') {
      throw new Error('Book.delete(): Unexpected error: Book ID is not defined.');
    }

    return new Book(
      await Prisma.book.delete({
        where: { id: this.schema.id },
      })
    );
  }
}
