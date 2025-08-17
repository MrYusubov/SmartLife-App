import { storage } from './storage';

export type Note = {
  id: string;
  title: string;
  content: string;
  reminder?: string;
};

const KEY = '@notes';

export const NotesRepo = {
  async all(): Promise<Note[]> {
    return (await storage.get<Note[]>(KEY, [])) ?? [];
  },

  async add(note: Omit<Note, 'id'>) {
    const all = await NotesRepo.all();
    const newNote: Note = { id: Date.now().toString(), ...note };
    await storage.set(KEY, [newNote, ...all]);
    return newNote;
  },

  async remove(id: string) {
    const all = await NotesRepo.all();
    await storage.set(KEY, all.filter(n => n.id !== id));
  },

  async get(id: string) {
    const all = await NotesRepo.all();
    return all.find(n => n.id === id);
  },
};
