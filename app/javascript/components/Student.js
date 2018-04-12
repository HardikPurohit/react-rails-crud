import React from "react"
import PropTypes from "prop-types"
class Student extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleDelete(event){
    this.props.handleDelete(event.target.dataset.id);
  }
  handleEdit(event){
    let thisObj = this;
    $('#id').val(event.target.dataset.id);
    $.get(`/api/v1/students/${event.target.dataset.id}/edit`, function (data) {
      $('#name').val(data.name);
      $('#marks').val(data.marks);
      thisObj.props.handleEdit(data.name, data.marks);
    }, 'json');
  }
  render () {
    return (
      this.props.currentStudent.map(student => {
        return(
          <tr key={student.id}>
            <td className="pad-4">{student.name}</td>
            <td className="pad-4">{student.marks}</td>
            <td className="pad-4">
              <input type="button"
                className="btn btn-primary"
                value="Edit"
                data-id={student.id}
                onClick={this.handleEdit}
              />&nbsp;&nbsp;
              <input
                type="button"
                className="btn btn-danger"
                value="Delete"
                data-id={student.id}
                onClick={this.handleDelete}
              />
            </td>
          </tr>
        )
      })
    );
  }
}

export default Student
