import { Book } from "../database/book";
import { Page } from "../database/page";

export class Author {

  private async initNotes() {
    const title = `Author's Note`;
    const summary = `Bird-eye view of Author's knowledge. This book serves as general notes and contains book titles that the AI Author have written.`;
    const tags = '#AuthorNotes #AIWriting #KnowledgeSummary #BookIndex #AIAuthored #GeneralNotes #WritingOverview #LiteraryCatalog #AuthorPerspective #BookCompilation';
    const book = await new Book({
      title,
      tags,
      summary,
    }).create();
    new Page({
      book_id: book.schema.id,
      page: 1,
      content: `Bird-eye view of Author's knowledge. This book serves as general notes and contains book titles that the AI Author have written.`,
      summary: '',
    });
  }

  async reviewNotes() {
    const title = `Author's Note`;
    const book = await Book.readById(...await new Book({ title }).readByTitle());
    if (book.length === 0) {
      await this.initNotes();
    }
  }

  async takeNotes() {
    const title = `Author's Note`;
    Book
    Page
  }
}