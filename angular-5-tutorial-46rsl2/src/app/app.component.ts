import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data-service';
import data from './data';

const COLOR_MAP = {
  'javascript': 'yellow',
  'python': 'lightgreen',
  'php': 'lime'
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  repos: any[] = [];
  showForm = false;
  languages = ['python', 'javascript', 'php', 'go'];
  repo =  {stargazers_count: 0, forks_count: 0};
  selectedRepo = {};

  constructor(private dataService: DataService) {

  }  

  ngOnInit() {
    // get repos on component initiliazation from service
    this.repos = data.items.slice(0,10)
    // this.dataService.getRepos()
    // .subscribe(
    //   data => this.repos = data['items'].slice(0, 10), 
    //   (err) => console.error(err)
    // );
  }

  getColor(repo) {
    // used to return different color for languages
    if (!repo.color) return 'black';
    const color = COLOR_MAP[repo['language'].toLowerCase()]
    return color  || 'black'
  }

  addRepo() {

    // validate that user actually typed name and descrption
    if(!this.repo['name'] || !this.repo['description'] || !this.repo['language']) return;

    // add this new repo to repos list
    this.repos.splice(0, 0, this.repo);

    // empty object for another repo to be created
    this.repo = {stargazers_count: 0, forks_count: 0};

    // hide form 
    this.showForm = false;
  }

  deleteRepo(repo) {
    // only delete after user confirms
    if (!confirm('Are you sure you want to delete ' + repo.name + '?')) return false

    // find repo matching the selected one and delete  
    const index = this.repos.indexOf(repo);
    this.repos.splice(index, 1);
  }

 setEditItem(repo) {
   // make a clone of the selectedRepo
   this.selectedRepo = {...repo};
   repo.isEditMode = true;
 }

  editRepo(repo) {
    // update repo with new values
   repo.name = this.selectedRepo['name'] || repo.name;
   repo.description = this.selectedRepo['description'] || repo.description;
   repo.isEditMode = false;
  }

}
