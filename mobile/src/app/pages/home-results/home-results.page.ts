import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';

const searchUrl="https://66tinypak8.execute-api.eu-west-1.amazonaws.com/marcind-hackaton/booksloan/user/marcind";
const searchUrl2="https://66tinypak8.execute-api.eu-west-1.amazonaws.com/marcind-hackaton/reservations/user/marcind";

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  books: any = [
    { 'id': 0, 'bookName': 'Thinking in java', 'author': 'Wojciech', 'description': 'blalal ' },
    { 'id': 1, 'bookName': '.NET', 'author': 'Przemyslaw', 'description': 'Woddsdv jciech' },
    { 'id': 2, 'bookName': 'Started', 'author': 'Marcin', 'description': 'ghnh cfdgd dfdgfdfg' }
  ];

  reservedBooks: any = [
    { 'id': 56, 'bookName': 'Special me', 'author': 'Wojciech', 'description': 'blalal', 'status': 'available' },
    { 'id': 234, 'bookName': 'Kubernetes', 'author': 'Przemyslaw', 'description': 'Woddsdv jciech', 'status': 'available' },
    { 'id': 67, 'bookName': 'Lion King', 'author': 'Marcin', 'description': 'ghnh cfdgd dfdgfdfg', 'status': 'borrowed' }
  ];

  ngOnInit() {
    this.http.get<any>(`${searchUrl}`).subscribe((results => this.books=results.books));
    this.http.get<any>(`${searchUrl2}`).subscribe((results => this.reservedBooks=results.books));
  }

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private http: HttpClient
  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async returnBook() {
    const returnBook = await this.alertCtrl.create({
      header: 'Return Book',
      message: 'Go to reception to return this book',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    returnBook.present();
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async bookDetails(book: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: book }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
