import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,LoadingController,ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'
import {Storage} from '@ionic/storage'
import { DetailsPage } from '../details/details';
/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {
  questions:string[];
  errorMessage:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public vieCtrl: ViewController,
    public rest:RestProvider,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public toastCtrl:ToastController
  ) {
    super()
  }

  ionViewDidLoad() {
    this.getQuestions();
  }
  getQuestions(){
    var loading=super.showLoading(this.loadingCtrl,'加载中...')
    this.rest.getQuestions().subscribe(f=>{
         this.questions=f
         loading.dismiss();
    },err=>this.errorMessage=<any>err)
  }
  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }
  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id:questionId})
  }
}
