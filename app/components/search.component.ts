import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {VideoService} from '../services/video.service';
@Component({
    selector: 'search',
    templateUrl: 'app/view/search.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, VideoService]
})

export class SearchComponent {
  public titulo = "Busqueda: ";
  public identity;
  public token;
  public videos;
  public errorMessage;
  public status;
  public loading;
  public pages;
  public pagePrev;
  public pageNext;
  public search_string;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.pageNext = 1;
    this.pagePrev = 1;
  }

  ngOnInit(){
    this.loading = 'show';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getSearchVideos();
    console.log(this.identity);
  }

  getSearchVideos(){

    this._route.params.subscribe(
      params => {
        let search : any = params["search"];
        if(!search || search.trim().length == 0){
          search = null;
          this._router.navigate(["/index"]);
        }
        let page = +params["page"];
        if(!page){
          page = 1;
        }
        this.search_string = search;
        this.loading = 'show';
        this._videoService.search(search, page).subscribe(
          response => {
            this.status = response.status;
            if(this.status != 'success'){
              this.status = 'error';
            }else{
              this.videos = response.data;
              this.loading = 'hide';
              this.pages = [];
              for(let i = 0;i < response.total_pages; i++){
                this.pages.push(i);
              }
              if(page >= 2){
                this.pagePrev = (page - 1);
              }else{
                this.pagePrev = page;
              }

              if(page < response.total_pages || page == 1){
                this.pageNext = (page + 1);
              }else{
                this.pageNext = page;
              }
              console.log(this.videos);
            }
          },
          error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        );
      }
    );
  }
}
