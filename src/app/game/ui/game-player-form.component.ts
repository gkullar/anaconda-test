import { Component, Input, OnChanges, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameMode } from '../models';

@Component({
  selector: 'app-game-player-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic', hideRequiredMarker: true }
    }
  ],
  templateUrl: './game-player-form.component.html',
  styleUrl: './game-player-form.component.scss'
})
export class GamePlayerFormComponent implements OnChanges {
  @Input() gameMode: GameMode;

  readonly back = output();

  readonly submitForm = output<typeof this.form.value>();

  readonly form = this.fb.group({
    playerOneName: this.fb.control('', Validators.required)
  });

  constructor(private fb: UntypedFormBuilder) {}

  ngOnChanges() {
    if (this.gameMode === 'multiplayer') {
      this.form.addControl('playerTwoName', this.fb.control('', Validators.required));
    }
  }

  onSubmitForm() {
    this.form.valid && this.submitForm.emit(this.form.value);
  }
}
