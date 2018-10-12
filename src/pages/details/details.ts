import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController,LoadingController ,ToastController} from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'
import {Storage} from '@ionic/storage'
import {AnswerPage} from '../answer/answer'
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {
  id:string;
  question:string[];
  answers:string[];
  errorMessage:any;
  IsFavourite:boolean;
  userId:string;
  isMyQuestion:boolean;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public loadingCtrl: LoadingController,
     public rest: RestProvider,
     public storage:Storage,
     public toastCtrl:ToastController
    ) {
    super();
  }
  ionViewDidLoad() {
    this.id=this.navParams.get('id');
    this.loadQuestion(this.id);
  }
  loadQuestion(id){
    this.storage.get('UserId').then(f=>{
      if(f!==null){
        this.userId=f;
        var loading=super.showLoading(this.loadingCtrl,'加载中...')
        this.rest.getQuestionWithUser(id,f).subscribe(q=>{
          this.question=q;
          console.dir(q)
          this.answers=q['Answers']
          this.IsFavourite=q["IsFavourite"]
          this.isMyQuestion=(q['OwnUserId']==f)
          loading.dismissAll();
        },err=>this.errorMessage=<any>err)
      }
    })
  }
  saveFavourite(){
    var loading=super.showLoading(this.loadingCtrl,'请求中...')
    this.rest.saveFavourite(this.id,this.userId).subscribe(q=>{
       if(q['Status']=='OK'){
          loading.dismiss();
          super.showToast(this.toastCtrl,this.IsFavourite?'取消关注成功':'关注成功')
          this.IsFavourite=!this.IsFavourite;
        }
    },err=>this.errorMessage=<any>err)
  }
  showAnswerPage(){
    let modal=this.modalCtrl.create(AnswerPage,{"id":this.id})
    modal.onDidDismiss(()=>{
      this.loadQuestion(this.id);
    })
    modal.present();
  }
}
