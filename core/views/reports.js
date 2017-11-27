import React, {Component} from 'react';
import AdminLayout from '@site/components/admin/AdminLayout';

import fetch from 'isomorphic-fetch';


class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    static async getInitialProps () {
        const res = await fetch(`http://localhost:1337/api/v1/getUserList`, {
          method: 'GET'
        });
        
        const json = await res.json();
        
        return { users: json }
      }

    listUsers() {
        return (
			<tbody>
			{this.state.users.map((user, i) => {
				return (
					<tr key={i}>
						<th>{user.email}</th>
						<td>Admin</td>
					</tr>
				)
			})}
			</tbody>
        )
    }
    render() {
        return (
        <AdminLayout url={this.props.url}>
            <div className="AdminIndex section">
              <div className="container">
                <h1>USERS</h1>
                <div className="block">
					<table className="table">
						<thead>
							<tr>
								<th>Email</th>
								<th>Name</th>
							</tr>
						</thead>
						{this.listUsers()}
					</table>
                </div>
              </div>
    
            </div>
        </AdminLayout>
        )
    }

}

export default Reports;