import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchBooksPage implements OnInit {

  books: any = [
    { 'id': 0, 'title': 'Thinking in java', 'author': 'Wojciech', 'description': 'blalal ' },
    { 'id': 1, 'title': '.NET', 'author': 'Przemyslaw', 'description': 'Woddsdv jciech' },
{ 'id': 2, 'title': 'Started', 'author': 'Marcin', 'description': 'ghnh cfdgd dfdgfdfg' }
];

constructor(public navCtrl: NavController,
    public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

}
