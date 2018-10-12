import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question'
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'
import { DetailsPage } from '../details/details'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  feeds: string[];
  errorMessage: any;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider
  ) {
    super()
  }
  ionViewDidLoad() {
    this.getFeeds()
  }
  gotoQuestion() {
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }
  gotoChat() {
    this.selectTab(2)
  }
  selectTab(index: number) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index)
  }
  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl, '数据加载中')
    this.rest.getFeeds().subscribe((f) => {
      this.feeds = f;
      loading.dismiss()
        , err => {
          this.errorMessage = <any>err;
        }
    })
  }
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage,{id:questionId})
  }
}
