import { Component } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';


const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;

@Component({
  selector: 'powe-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  users: Observable<any>;

  constructor(private apollo: Apollo) {
    // this.apollo.watchQuery({ query: GET_USERS })
    //   .valueChanges.subscribe((result) =>
    //     console.log(result)
    //   );
  }
}
