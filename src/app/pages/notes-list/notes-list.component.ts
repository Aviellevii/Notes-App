import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})

export class NotesListComponent implements OnInit {
    
  notes:Note[]=new Array<Note>();
  filteredNotes:Note[]=new Array<Note>();
  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>;
  

  constructor( private notesService:NotesService ) { }

  ngOnInit(): void {
    //retrieve all notes from NotesService
    this.notes=this.notesService.getAll();
    this.filteredNotes=this.notes;
  }
  deleteNote(id:any){
    this.notesService.delete(id);
  }
 
  filter(query:any){
    query=query.toLocaleLowerCase().trim();
    let allResults:Note[]=new Array<Note>();
    //split up the search query into indvidual words
    let terms:string[]=query.split(' ');//split on spaces
    //remove duplicate search term
    terms=this.removeDuplicates(terms);
    //compile all relevant result into allresult array
    terms.forEach(term=>{
      let results:Note[]=this.relevantNotes(term);
      //append result to the allResult array
      allResults=[...allResults,...results];
    });
    // allResults will include duplicate notes
    // because a particular note can be the result of many search terms
    // but we don't want to show the same note multiple times on the UI
    // so we first must remove the duplicates
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes=uniqueResults;
  }
  removeDuplicates(arr:Array<any>):Array<any>{
      let uniqueResults:Set<any>=new Set<any>();
      //loop through the input array and add the items to the set
      arr.forEach(e=>uniqueResults.add(e));
      return Array.from(uniqueResults);
  }
  relevantNotes(query: string) :any {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })

    return relevantNotes;
  }

}
