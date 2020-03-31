import { Component, OnInit, Inject } from '@angular/core';
import { Questions } from './questions';
import { Responses } from './response';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sra';
  quiz = true;
  result = false;
  takeAway = false;
  questions = Questions;
  smartQuestion = [];
  pager = {
    index: 0,
    size: 1,
    count: 13
  };

  response: Array<Responses> = [];
  results = [];
  totalScore: number;
  interval: any;
  low = false;
  moderate = false;
  high = false;
  // response: 'NO' | 'YES' = 'NO';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.interval = setInterval(() => {
      window.location.reload();
    }, 120000);
  }

  get filteredQuestions(): any {
    return (this.questions) ?
      this.smartQuestion = this.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.quiz = true;
    }
  }

  responseNow(questionNo, answer) {
    const responseObj = new Responses();
    responseObj.questionNo = questionNo;
    responseObj.answer = answer;
    if (answer === 'YES') {
        responseObj.isCorrect = 1;
    } else {
      responseObj.isCorrect = 0;
    }
    this.response.push(responseObj);
    this.results = this.response;
    console.log(this.response);
  }

  submitNow() {
    console.log(this.results);
    let total = 0;
    if (this.results != null && this.results.length < 14) {
          this.results.forEach(x => total += x.isCorrect);
        }
    this.totalScore = total;
    if (this.totalScore === 0 || this.totalScore === 1 || this.totalScore === 2 || this.totalScore === 3 || this.totalScore === 4) {
        this.low = true;
        this.moderate = false;
        this.high = false;
    } else if (this.totalScore === 5 || this.totalScore === 5 || this.totalScore === 7 || this.totalScore === 8) {
      this.low = false;
      this.moderate = true;
      this.high = false;
    // tslint:disable-next-line: max-line-length
    } else if (this.totalScore === 9 || this.totalScore === 10 || this.totalScore === 11 || this.totalScore === 12 || this.totalScore === 13) {
      this.low = false;
      this.moderate = false;
      this.high = true;
    }
    this.result = true;
    this.quiz = false;
    console.log(total);
  }

  backToQuiz() {
    this.result = false;
    this.quiz = true;
    window.location.reload();
  }

  quickTakeAway() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(DetailsmModal, {width: '60%' });
  }

}

// quick take away

// child component
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'details-modal',
  templateUrl: 'details.modal.component.html',
  styleUrls: ['./app.component.scss']

})
// tslint:disable-next-line: component-class-suffix
export class DetailsmModal {


  constructor(
    public dialogRef: MatDialogRef<DetailsmModal>,

    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
