import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  saveNoteForm: FormGroup;
  editNoteForm: FormGroup;
  // saveNoteForm = new FormGroup
  // ({
  //   textNote: new FormControl('', [Validators.required]),
  //   color: new FormControl('')
  // })

  // editNoteForm = new FormGroup({
  //   _id: new FormControl(''),
  //   textNote: new FormControl('', [Validators.required]),
  //   color: new FormControl('')
  // })

  constructor(
    private fb: FormBuilder,
    private noteService: NotesService,
    private toastr: ToastrService,
    private modalService: NgbModal,

  ) { }
  myColors;
  myNotes;
  selectc = '';
  textname = '';
  opennav: boolean = false;
  widthExp = 0;
  ngOnInit(): void {
    this.saveNoteForm = this.fb.group({
      textNote: new FormControl('', [Validators.required]),
      color: new FormControl('')
    })
    this.editNoteForm = this.fb.group({
      _id: new FormControl(''),
      textNote: new FormControl('', [Validators.required]),
      color: new FormControl('')
    })
    this.myColors = ['color-light-blue', 'color-light-pink', 'color-light-red', 'color-light-green',
      'color-light-yellow',
      'color-light-skyblue'];
    this.getNotes();
  }
  saveNote(color) {
    this.saveNoteForm.value.color = color;
    this.noteService.saveNotes(this.saveNoteForm.value)
      .subscribe(
        res => {
          this.saveNoteForm.reset();
          this.getNotes()
          this.toastr.success(res['message']);
        },
        err => {
          this.toastr.error(err['message']);
        }
      )
  }
  getNotes() {
    this.noteService.getNotes()
      .subscribe(
        res => {
          this.myNotes = res['Data']
        },
        err => {
          this.toastr.error(err['message']);
        }
      )
  }
  editNote(note, mymodal) {
    this.modalService.open(mymodal)
    this.editNoteForm.setValue({
      _id: note._id,
      textNote: note.textNote,
      color: note.color,
    })
    this.textname = note.textNote
  }

  updateNote(color) {
    this.editNoteForm.value.color = color;
    this.noteService.updateNotes(this.editNoteForm.value)
      .subscribe(
        res => {
          this.editNoteForm.reset();
          this.getNotes();
          this.modalService.dismissAll();
          this.toastr.success(res['message']);
        },
        err => {
          this.toastr.error(err['message']);
        }
      )

  }

  removeNote(noteId) {
    console.log(noteId)
    this.noteService.removeNotes(noteId)
      .subscribe(
        res => {
          this.editNoteForm.reset();
          this.getNotes();
          this.modalService.dismissAll();
          this.toastr.success(res['message']);
        },
        err => {
          this.toastr.error(err['message']);
        }
      )
  }
  selectedColor(color) {
    console.log(color)
    if (color == 'All') {
      this.selectc = ''
    } else {
      this.selectc = color
    }
    this.closeNavBar();
  }
  openNavBar() {
    this.opennav = true;
    this.widthExp = 150;
  }
  closeNavBar() {
    this.opennav = false;
    this.widthExp = 0;
  }
}
