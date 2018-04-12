import React from "react"
import Student from "./Student"
import StudentForm from "./StudentForm"
import PropTypes from "prop-types"
import Pagination from './Pagination'
class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: JSON.parse(this.props.students),
      current_page: 1
    };
    this.refreshList = this.refreshList.bind(this);
    this.loadStudents = this.loadStudents.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.onPaginationClick = this.onPaginationClick.bind(this);
  }
  refreshList(){
    this.loadStudents()
  }
  loadStudents() {
    let thisobj = this;
    $.get('/api/v1/students', function (data) {
      thisobj.setState({ list: data });
    }, 'json');
  }
  handleEdit(name, marks){
    this.state = {
      edit: [name, marks]
    };
  }
  handleDelete(id) {
    let thisobj = this;
    $.ajax({
      url: `api/v1/students/${id}`,
      method: 'DELETE',
      dataType: 'JSON',
      complete: function () {
        thisobj.loadStudents();
      }
    });
  }
  handleSort(target){
    var sort_by = target.dataset.sort_by;
    var sort_order = target.dataset.sort_order;
    let thisobj = this;
    let currentPageIds = [];
    thisobj.state.list.forEach(function(element) {
      currentPageIds.push(element.id);
    });
    $.get('/api/v1/students/sort', {sort_by: sort_by, sort_order: sort_order, recordsIds: currentPageIds, page: thisobj.state.current_page }, function (data) {
      toggleClickedClass(target);
      toggleOtherClass(target);
      thisobj.setState({ list: data });
    }, 'json');
  }
  onPaginationClick = (number, e) => {
    e.preventDefault();
    let thisobj = this;
    jQuery.ajax({
      type: 'get',
      url: '/api/v1/students',
      dataType: 'json',
      data: { page: number },
      success: function(data){
        thisobj.setState({ list: data, current_page: number});
      }
    });
  }
  render () {
    let thisobj = this;
    return (
      <div className="container panel panel-default">
        <h3 className="pad-lf-60">Student Form</h3>
        <StudentForm refreshList={this.refreshList} editProps={this.state.edit}/><br /><br />
        <div className="panel-body">
          <table border='1' className='table-striped'>
            <thead>
              <tr>
                <th className="text-center">
                  Name
                  <i className="fa fa-chevron-down cursor-pointer" id="sortName" data-sort_by="name" data-sort_order="desc" onClick={(e) => this.handleSort(e.target
                    )}></i>
                </th>
                <th className="text-center">
                  Marks
                  <i className="fa fa-chevron-down cursor-pointer" id="sortMarks" data-sort_by="marks" data-sort_order="desc" onClick={(e) => this.handleSort(e.target
                    )}></i>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <Student currentStudent = {thisobj.state.list}
                        handleDelete = {this.handleDelete}
                        handleEdit = {this.handleEdit}
              />
            </tbody>
          </table>
          { this.props.total_pages > 1 && (
                  <Pagination
                    current_page={this.state.current_page}
                    total_pages={this.props.total_pages}
                    total_count={this.props.total_count} onPaginationClick={this.onPaginationClick}
                  /> )
                }
        </div>
      </div>
    );
  }
}

function toggleClickedClass(target){
  target.style.color="brown";
  if(target.dataset.sort_order == "asc"){
    target.classList.remove('fa-chevron-up');
    target.classList.add('fa-chevron-down');
    target.dataset.sort_order = "desc"
  } else {
    target.classList.remove('fa-chevron-down');
    target.classList.add('fa-chevron-up');
    target.dataset.sort_order = "asc"
  }
}
function toggleOtherClass(target){
  var ele_id = (target.id == "sortName") ? 'sortMarks' : 'sortName';
  var ele = document.getElementById(ele_id);
  ele.classList.add('fa-chevron-down');
  ele.classList.remove('fa-chevron-up');
  ele.style.color="black";
}
export default StudentList
