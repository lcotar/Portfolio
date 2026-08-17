import { Component, inject } from '@angular/core';
import { ContactformComponent } from './contactform/contactform.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailRfcValidatorDirective } from './validators/email-rfc.validator';

@Component({
  selector: 'app-contact-me',
  imports: [
    // ContactformComponent,
    TranslateModule,
    FormsModule,
    CommonModule,
    RouterModule,
    EmailRfcValidatorDirective,
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent {
  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = false;
  privacyAccepted = false;
  messageSent = false;
  messageError = false;
  private messageSentTimeout?: ReturnType<typeof setTimeout>;
  private messageErrorTimeout?: ReturnType<typeof setTimeout>;

  post = {
    endPoint: 'https://leacotar.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (!ngForm.submitted || !ngForm.form.valid || !this.privacyAccepted) return;

    if (this.mailTest) {
      ngForm.resetForm();
      this.showThankYouMessage();
      return;
    }

    this.sendContactRequest(ngForm);
  }

  private sendContactRequest(ngForm: NgForm) {
    this.http
      .post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: () => {
          ngForm.resetForm();
          this.showThankYouMessage();
        },
        error: () => this.showErrorMessage(),
      });
  }

  private showThankYouMessage() {
    clearTimeout(this.messageSentTimeout);
    this.messageSent = true;
    this.messageSentTimeout = setTimeout(() => {
      this.messageSent = false;
    }, 5000);
  }

  private showErrorMessage() {
    clearTimeout(this.messageErrorTimeout);
    this.messageError = true;
    this.messageErrorTimeout = setTimeout(() => {
      this.messageError = false;
    }, 5000);
  }
}
