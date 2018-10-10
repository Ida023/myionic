import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {
  title: string;
  content: string;
  errorMessage: any;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, '发表中...')
        this.rest.saveQuestion(val, this.title, this.content).subscribe((f) => {
          super.showToast(this.toastCtrl, f['StatusContent'])          
          if (f['Status'] == 'OK') {
            loading.dismissAll();
            this.dismiss();
          } else {
            loading.dismissAll();
          }
        }, err => this.errorMessage = <any>err)

      }
      err => {
        super.showToast(this.toastCtrl, '请登录后发布提问')
      }
    })
  }
}
