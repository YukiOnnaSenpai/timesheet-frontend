import { Component, EventEmitter, OnInit, Output, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-alpha-sort',
  templateUrl: './alpha-sort.component.html',
  styleUrls: ['./alpha-sort.component.scss']
})
export class AlphaSortComponent implements OnInit {
  alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  isCharacterSelected: boolean = false;
  activeCharacter: string = '';

  @Output() selectedCharacterEvent = new EventEmitter<string>();
  @ViewChild('li', { static: false }) listItem: ElementRef | any;

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  }

  selectedCharacter(character : string) {
    //check logic once again!
    this.selectedCharacterEvent.emit(character);
    this.isCharacterSelected = true;
    this.activeCharacter = character;
    this.addAcitveClass();
    if(this.activeCharacter != '' && this.activeCharacter != character)
    {
      this.removeActiveClass();
    }
    this.activeCharacter = character;
    // return character;
  }

  addAcitveClass() {
    this.renderer.addClass(this.listItem.nativeElement, 'active' );
  }
   
  removeActiveClass() {
    this.renderer.removeClass(this.listItem.nativeElement, 'active');
  }

}
