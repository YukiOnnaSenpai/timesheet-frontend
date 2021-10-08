import { Component, EventEmitter, OnInit, Output, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-alpha-sort',
  templateUrl: './alpha-sort.component.html',
  styleUrls: ['./alpha-sort.component.scss']
})
export class AlphaSortComponent implements OnInit {
  alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  isCharacterSelected: boolean = false;

  @Output() selectedCharacterEvent = new EventEmitter<string>();
  @ViewChild('li', { static: false }) listItem: ElementRef | any;

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  }

  selectedCharacter(character : string) {
    this.selectedCharacterEvent.emit(character);
    this.isCharacterSelected = true;
    this.addClass();
    // return character;
  }

  addClass() {
    this.renderer.addClass(this.listItem.nativeElement, 'active' );
  }
   
  removeClass() {
    this.renderer.removeClass(this.listItem.nativeElement, 'blackborder');
  }

}
