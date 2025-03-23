import { Prisma } from "../shared/Prisma";

type PageSchema = {
  id?: number,
  book_id?: number,
  page?: number,
  content?: string,
  summary?: string,
}

export class Page {

  constructor(
    public schema: PageSchema
  ) {};

  async create(): Promise<Page> {
    if (typeof this.schema.book_id === 'undefined') {
      throw new Error('Page.create(): Unexpected error: Page `book_id` is not defined.');
    }
    if (typeof this.schema.page === 'undefined') {
      throw new Error('Page.create(): Unexpected error: Page page is not defined.');
    }
    if (typeof this.schema.content === 'undefined') {
      throw new Error('Page.create(): Unexpected error: Page content is not defined.');
    }
    if (typeof this.schema.summary === 'undefined') {
      throw new Error('Page.create(): Unexpected error: Page summary is not defined.');
    }

    return new Page(
      await Prisma.page.create({
        data: {
          book_id: this.schema.book_id,
          page: this.schema.page,
          content: this.schema.content,
          summary: this.schema.summary,
        }
      })
    );
  }

  async readPage(): Promise<Page | null> {
    if (typeof this.schema.book_id === 'undefined') {
      throw new Error('Page.readPage(): Unexpected error: Page `book_id` is not defined.');
    }
    if (typeof this.schema.page === 'undefined') {
      throw new Error('Page.readPage(): Unexpected error: Page page is not defined.');
    }
    const page = await Prisma.page.findFirst({
      where: {
        book_id: this.schema.book_id,
        page: this.schema.page,
      }
    });
    return page ? new Page(page) : null;
  }

  static async readById(...id: number[]): Promise<Page[]> {
    const pages = await Prisma.page.findMany({
      where: {
        id: {
          in: id
        }
      }
    });

    return pages.map(page => new Page(page))
  }

  async readBySummary(): Promise<number[]> {
    if (typeof this.schema.summary === 'undefined') {
      throw new Error('Page.readBySummary(): Unexpected error: Page summary is not defined.');
    }

    const pages = await Prisma.page.findMany({
      where: {
        summary: {
          contains: this.schema.summary,
        },
      },
      select: {
        id: true,
      },
    });

    const pageIds: number[] = [];

    for (const page of pages) {
      pageIds.push(page.id);
    }

    return pageIds;
  }

  async update(): Promise<Page> {
    if (typeof this.schema.id === 'undefined') {
      throw new Error('Page.update(): Unexpected error: Page ID is not defined.');
    }
    if (typeof this.schema.book_id === 'undefined') {
      throw new Error('Page.update(): Unexpected error: Page `book_id` is not defined.');
    }
    if (typeof this.schema.content === 'undefined') {
      throw new Error('Page.update(): Unexpected error: Page tags is not defined.');
    }
    if (typeof this.schema.page === 'undefined') {
      throw new Error('Page.update(): Unexpected error: Page number is not defined.');
    }
    if (typeof this.schema.summary === 'undefined') {
      throw new Error('Page.update(): Unexpected error: Page summary is not defined.');
    }

    return new Page(
      await Prisma.page.update({
        where: { id: this.schema.id },
        data: {
          book_id: this.schema.book_id,
          content: this.schema.content,
          page: this.schema.page,
          summary: this.schema.summary,
        },
      })
    );
  }

  async delete(): Promise<Page> {
    if (typeof this.schema.id === 'undefined') {
      throw new Error('Page.delete(): Unexpected error: Page ID is not defined.');
    }

    return new Page(
      await Prisma.page.delete({
        where: { id: this.schema.id },
      })
    );
  }
}
