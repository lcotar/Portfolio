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
  /* thankYouVisible = false;
    http=inject(HttpClient) */

  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  /* onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.contactData);
    }
  } */

  mailTest = false;
  privacyAccepted = false;
  messageSent = false;
  private messageSentTimeout?: ReturnType<typeof setTimeout>;

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
    if (
      ngForm.submitted &&
      ngForm.form.valid &&
      !this.mailTest &&
      this.privacyAccepted
    ) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.showThankYouMessage();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (
      ngForm.submitted &&
      ngForm.form.valid &&
      this.mailTest &&
      this.privacyAccepted
    ) {
      ngForm.resetForm();
      this.showThankYouMessage();
    }
  }

  private showThankYouMessage() {
    clearTimeout(this.messageSentTimeout);
    this.messageSent = true;
    this.messageSentTimeout = setTimeout(() => {
      this.messageSent = false;
    }, 5000);
  }
}
