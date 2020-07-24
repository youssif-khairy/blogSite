import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthModel } from 'src/app/models/auth.model';
import { LanguageService } from 'src/app/language.service';
import { HttpClient } from '@angular/common/http';
//declare var StripeCheckout: StripeCheckoutStatic;
declare var Stripe; // : stripe.StripeStatic;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('cardElement', { static: true }) cardElement: ElementRef;

  // handler: StripeCheckoutHandler;
  amount = 100;
  //confirmation: any;
  stripe; // : stripe.Stripe;
  card;
  cardErrors;
  confirmation;
  client_secret:string;

  form: FormGroup;
  constructor(private authService: AuthService, private langService: LanguageService,private http:HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })

    this.stripe = Stripe('pk_test_51H3lP3KqOsrFlAiC2b0hTkC4zdenwk2F6PYSjMgKAndt1DTUzy9BrOLkpLkwAtkEbtovJzL1lhgtpaYCMTUdB24O00lhXQNfOV')
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
    //call backend client_secret
    this.http.get<{client_secret:string}>('http://localhost:3000/secret').subscribe(secret=>{
      console.log('Client secret from server is : '+ secret.client_secret)
      this.client_secret = secret.client_secret;
    })

    /* this.handler = StripeCheckout.configure({
      key: '',
      //image: '/your-avatar.png',
      locale: 'auto',
      source: async (source) => {
        //charge in backend here
        console.log(source)
      }
    }); */
  }


  async handleForm(e) {
    e.preventDefault();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.
      this.cardErrors = error.message;
    } else {
      // Send the token to your server.
      //secret key should be requested from server and sent to client
      console.log(`also client secret is  ${this.client_secret}`)
      this.stripe.confirmCardPayment(this.client_secret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: 'youssif aly'
          }
        }
      }).then(function(result){
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            console.log(result)
          }
        }
      })
      console.log(source)

    }

  }

  /*  // Open the checkout handler
   async checkout(e) {
     this.handler.open({
       name: 'MY store',
       description: 'description',
       amount: this.amount,
       currency:"EGP",
       email: 'test@test.com',
     });
     e.preventDefault();
   }
   // Close on navigate
   @HostListener('window:popstate')
   onPopstate() {
     this.handler.close();
   } */
  onSubmit() {
    this.authService.login(new AuthModel(this.form.value.email, this.form.value.password))
  }
  onLanguageChange() {
    this.langService.toogleLanguage()
  }
}
