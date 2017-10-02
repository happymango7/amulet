import React, {Component} from 'react';
import AdminLayout from '../../components/admin/AdminLayout'

class Reports extends Component {
    render() {
        return (
        <AdminLayout url={this.props.url}>
            <div className="AdminIndex section">
              <div className="container">
                <h1>REPORTS</h1>
                <div className="boxContainer">
                    <p>Coming soon...</p>
                </div>
              </div>
    
            </div>
        </AdminLayout>
        )
    }

}

export default Reports;