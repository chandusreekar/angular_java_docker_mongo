package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */

@Service
public class NoteServiceImpl implements NoteService {

	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	private NoteRepository noteRepository;

	@Autowired
	public NoteServiceImpl(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}

	/*
	 * This method should be used to save a new note.
	 */
	public boolean createNote(Note note) {

		
		//note.set
		//logger.info("Inside createNote "+note.getNoteContent());
		int count = 1;
		NoteUser noteUser = new NoteUser();
		List<Note> notes = new ArrayList<>();
		note.setNoteCreationDate(new Date());
		if (noteRepository.existsById(note.getNoteCreatedBy())) {
			//logger.info("Inside if getNoteCreatedBy "+note.getNoteCreatedBy());
			notes = noteRepository.findById(note.getNoteCreatedBy()).get().getNotes();
			Iterator iterator = notes.iterator();
			Note note1 = new Note();
			while (iterator.hasNext()) {

				note1 = (Note) iterator.next();
			}
			note.setNoteId(note1.getNoteId() + count);
			notes.add(note);
			noteUser.setUserId(note.getNoteCreatedBy());
			noteUser.setNotes(notes);
			if (noteRepository.save(noteUser) != null) {
				//logger.info("Inside save "+note.getNoteTitle());
				return true;
			}
			//logger.info("Inside  ");
		} else { 
			//logger.info("Inside else "+note.getNoteTitle());
			note.setNoteId(count);
			notes.add(note);
			noteUser.setUserId(note.getNoteCreatedBy());
			noteUser.setNotes(notes);

			if (noteRepository.insert(noteUser) != null) {
			//	logger.info("Inside insert "+note.getNoteTitle());
				return true;
			}
		}
		return false;
	
	}
	/* This method should be used to delete an existing note. */

	public boolean deleteNote(String userId, int noteId) {

		NoteUser noteUser = new NoteUser();
		List<Note> notes = noteRepository.findById(userId).get().getNotes();

		if (!notes.isEmpty()) {
			Iterator iterator = notes.listIterator();
			while (iterator.hasNext()) {
				Note note = (Note) iterator.next();
				if (note.getNoteId() == noteId)
					iterator.remove();

			}
			noteUser.setUserId(userId);
			noteUser.setNotes(notes);
			noteRepository.save(noteUser);
			return true;
		}

		return false;
	
	}

	/* This method should be used to delete all notes with specific userId. */

	public boolean deleteAllNotes(String userId) throws NoteNotFoundExeption {

		NoteUser noteUser = new NoteUser();
		try {
			List<Note> notes = noteRepository.findById(userId).get().getNotes();
			if (notes != null) {

				Iterator iterator = notes.listIterator();
				while (iterator.hasNext()) {
					iterator.next();
					iterator.remove();

				}
				noteUser.setUserId(userId);
				noteUser.setNotes(notes);
				noteRepository.save(noteUser);
				return true;

			}

		} catch (NoSuchElementException exception) {

			throw new NoteNotFoundExeption("Note not found");
		}

		return false;
	
	}

	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int noteId, String userId) throws NoteNotFoundExeption {

		try {
			NoteUser noteData = noteRepository.findById(userId).get();

			List<Note> notes = noteData.getNotes();

			Note newNote = new Note();

			ListIterator<Note> itr = notes.listIterator();
			while (itr.hasNext()) {
				Note noteDate = itr.next();
				if (noteDate.getNoteId() == noteId) {
					System.out.println("inside matching condition");
					itr.remove();
					System.out.println("after removing elemnt"+notes);
					newNote.setCategory(note.getCategory());
					newNote.setNoteContent(note.getNoteContent());
					newNote.setNoteCreatedBy(note.getNoteCreatedBy());
					newNote.setNoteCreationDate(new Date());
					newNote.setNoteId(noteId);
					newNote.setNoteStatus(note.getNoteStatus());
					newNote.setNoteTitle(note.getNoteTitle());
					newNote.setReminders(note.getReminders());
					notes.add(newNote);
					System.out.println("after adding new element"+newNote);
					noteData.setNotes(notes);
					noteData.setUserId(userId);
					noteRepository.save(noteData);
					
					break;
				}
			}



			System.out.println("updated UserNote is ===========>"+noteData);
			System.out.println("updated notes is ===========>"+notes);
			return newNote;
		} catch (Exception e) {
			throw new NoteNotFoundExeption("note not found");
		}

	}

	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {

		try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			Note notes = noteUser.getNotes().get(0);
			return notes;
		} catch (Exception e) {
			throw new NoteNotFoundExeption("note not found");
		}

	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {

		try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			List<Note> notes = noteUser.getNotes();
			return notes;
		} catch (Exception e) {
			return null;
		}

	}

}
