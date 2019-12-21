import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {

  constructor(
    public http: Http,
    public baseService: BaseService,
    public alertCtrl: AlertController
  ) {
  }

  alertMessage(call){
    var title_text;
    var message_text;
    switch(call){
      case "saveCardData":
        title_text = "Credit Card Invalid";
        message_text = "Your Credit Card information isn't valid, please try again";
        break;
    }
    let alert = this.alertCtrl.create({
      title: title_text,
      message: message_text,
      buttons: ['OK'],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  header(){
    let token = window.localStorage.getItem('access_token_api');
    let headers = new Headers({ 'Authorization': 'Token token=' + token, 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return options
  }

  getMinVersionRequired(){
    let url = this.baseService.baseUrl + "min_version_required"
    console.log(url)
    return this.http.get(url)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getChargerData(params){
    let url = this.baseService.baseUrl + "get_listing_by_title?listing_title=" + params
    console.log(url)
    return this.http.get(url)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getListingContent(listing_id){
    let options = this.header()
    let url = this.baseService.baseUrl + "listing_map_content/" + listing_id
    console.log(url);
    return this.http.get(url, options)
      .map((res:any)=>res._body)
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getClusterContent(listing_ids){
    let options = this.header()
    let url = this.baseService.baseUrl + "listing_map_content?map=true&listing_ids=" + listing_ids.join()
    console.log(url);
    return this.http.get(url, options)
      .map((res:any)=>res._body)
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getClusterContentModal(listing_ids){
    let options = this.header()
    let url = this.baseService.baseUrl + "listing_map_content?listing_ids=" + listing_ids
    console.log(url);
    return this.http.get(url, options)
      .map((res:any)=>res._body)
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  checkChargerStarted(person_id, transaction_id) {
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + transaction_id + "/transaction_status?"
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  cancelBookingData(person_id, trans_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + trans_id + "/confirmation?"
    console.log(url);
    return this.http.put(url, params, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getNearestChargerData(lat, lng){
    console.log(this.baseService.baseUrl + "nearest_charger?lat=" + lat.toString() + "&lng=" + lng.toString());
    return this.http.get(this.baseService.baseUrl + "nearest_charger?lat=" + lat.toString() + "&lng=" + lng.toString())
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getCurrentLocation(){
    console.log("http://ip-api.com/json/");
    return this.http.get("http://ip-api.com/json/")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getProfiles(){
    return this.http.get(this.baseService.baseUrl + "listings")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getProfileData(id,person_id){
    console.log(this.baseService.baseUrl + "listings/" + id + '?person_id='+person_id);
    return this.http.get(this.baseService.baseUrl + "listings/" + id + '?person_id='+person_id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getListingInfo(){
    console.log(this.baseService.baseUrl + "create_listing_info");
    return this.http.get(this.baseService.baseUrl + "create_listing_info")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getUserInfoData(id){
    console.log(this.baseService.baseUrl + "people/" + id + "/profile_show");
    return this.http.get(this.baseService.baseUrl + "people/" + id + "/profile_show")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getWalletData(id){
    console.log(this.baseService.baseUrl + "people/" + id + "/wallets");
    return this.http.get(this.baseService.baseUrl + "people/" + id + "/wallets")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getActivityData(id, wallet_id) {
    console.log(this.baseService.baseUrl + "people/" + id + "/wallets/" + wallet_id + "/activities");
    return this.http.get(this.baseService.baseUrl + "people/" + id + "/wallets/" + wallet_id + "/activities")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  createListCharger(options){
    let httpOptions = this.header()
    let url = this.baseService.baseUrl + 'listings'
    return this.http.post(url, options, httpOptions)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getTimeAvailableArray(id, start_date, end_date){
    console.log("https://staging.swtchenergy.com/listings/" + id + "/fetch_times?start_date=" + start_date + "&end_date=" + end_date + "&mobile=true");
    return this.http.get("https://staging.swtchenergy.com/listings/" + id + "/fetch_times?start_date=" + start_date + "&end_date=" + end_date + "&mobile=true")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getCarDetailsModelData(maker){
    let options = this.header()
    return this.http.get('https://staging.swtchenergy.com/api/v1/car_makers?val=' + maker.toLowerCase() + "_cars", options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  callbackData(accessToken){
    return this.http.get(this.baseService.callbackUrl + "?mobile=true&access_token=" + accessToken)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getPersonData(person_id){
    console.log(this.baseService.peopleUrl + person_id);
    return this.http.get(this.baseService.peopleUrl + person_id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  updateAgreementData(person_id, params){
    console.log(this.baseService.peopleUrl + person_id + "/agreement?=" + params);
    return this.http.get(this.baseService.peopleUrl + person_id + "/agreement?=" + params)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  updatePersonData(person_id, body){
    let options = this.header()
    console.log(this.baseService.peopleUrl + person_id + '?' +body);
    return this.http.patch(this.baseService.peopleUrl + person_id + '?' + body, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getCarDetailsData(person_id){
    let options = this.header()
    console.log(this.baseService.peopleUrl + person_id + '/car_details/new');
    return this.http.get(this.baseService.peopleUrl + person_id + '/car_details/new', options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  updateCarDetailsData(person_id, body, car_id){
    let options = this.header()
    console.log(this.baseService.peopleUrl + person_id + '/car_details/' + car_id+ '?' + body)
    return this.http.post(this.baseService.peopleUrl + person_id + '/car_details?' + body, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getInboxData(person_id){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + '/inboxes';
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getTransactionsData(person_id, id){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + '/transactions/' + id;
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getActiveTransaction(person_id) {
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/get_active";
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getTransactionsList(person_id, params){
    var params = params.toString();
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + '/transactions?' + params;
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getConversationsData(person_id, id){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + '/conversations/' + id;
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  uploadMessageData(person_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/messages?" + params
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  uploadConversationData(person_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/conversations?" + params
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  uploadAcceptOrRejected(person_id, transaction_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + transaction_id + "/accepted_or_rejected?" + params
    console.log(url);
    return this.http.put(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  noReservationTransaction(person_id, transaction_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + transaction_id + "/no_reservation?" + params
    console.log("no_res put request ",url);
    return this.http.put(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  uploadConfirmOrDisupte(person_id, transaction_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + transaction_id + "/confirmation?" + params
    console.log(url);
    return this.http.put(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  readyToCheckIn(person_id, transaction_id){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + transaction_id + "/paid"
    console.log(url);
    return this.http.put(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  uploadFeedback(person_id, transaction_id, params){
    let options = this.header()
    let url = this.baseService.peopleUrl + person_id + "/transactions/" + transaction_id + "/feedbacks?" + params
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getBookingData(id, params){
    let options = this.header()
    let url = this.baseService.baseUrl + 'listings/' + id + '/initiate?' + params;
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getPrice(id, params) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'listings/' + id + '/total_price?' + params;
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getFavouriteChargers(person_id) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'people/' + person_id + '/favourite_listings';
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  uploadBookingData(id, params) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'listings/' + id + '/initiated?' + params;
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  retryCharger(person_id, transaction_id) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'people/' + person_id + '/transactions/' + transaction_id + '/retry';
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  sendDeviceToken( person_id, device_token) {
    let options = this.header()
    let url = this.baseService.baseUrl + "people/" + person_id + "/" + "android_device_tokens?token=" + device_token;
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  favouriteCharger(person_id, listing_id) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'people/' + person_id + '/favourite_listings?listing_id=' + listing_id;
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  favouriteChargerTitles(person_id) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'people/' + person_id + '/person_fav_listing_titles';
    console.log(url);
    return this.http.get(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  removeFavouriteCharger(person_id, listing_id) {
    let options = this.header()
    let url = this.baseService.baseUrl + 'people/' + person_id + '/favourite_listings/' + listing_id;
    console.log(url);
    return this.http.delete(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  saveCardData(options, person_id) {
    let httpOptions = this.header()
    let url = this.baseService.baseUrl + "people/" + person_id + "/wallets";
    console.log(url);
    return this.http.post(url, options, httpOptions)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  updateCardData(obj, wallet_id, person_id) {
    let httpOptions = this.header()
    let url = this.baseService.baseUrl + "people/" + person_id + "/wallets/" + wallet_id;
    console.log(url);
    return this.http.patch(url, obj, httpOptions)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  updateCardInfo(obj, person_id, wallet_id) {
    let options = this.header()
    let url = this.baseService.baseUrl + "people/" + person_id + "/wallets/" + wallet_id + "/update_card" ;
    console.log(url);
    return this.http.patch(url, obj, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
}
