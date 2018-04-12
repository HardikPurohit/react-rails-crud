import React from "react"
import PropTypes from "prop-types"
class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let thisObj = this;
    if($('#name').val() != "" && $('#marks').val() != ""){
      if($('#id').val() == ""){
        $.post('/api/v1/students', { student: {name: $('#name').val(), marks: $('#marks').val()} }, function (data) {
          thisObj.props.refreshList();
        }, "json");
      } else {
        id = $('#id').val();
        $.ajax({
          url: `api/v1/students/${id}`,
          method: 'PATCH',
          data: {
            student: {
              name: $('#name').val(),
              marks: $('#marks').val()
            }
          },
          dataType: 'JSON',
          complete: function () {
            thisObj.props.refreshList();
          }
        });
      }
      clearTextBoxAndClass();
    } else {
      alert('Please, fill all the fields');
    }
  }
  removeHiddenValues(event){
    clearTextBoxAndClass();
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit} className="form-inline">
        <div className="form-group">
          <table>
            <tbody>
              <tr>
                <th>
                  Name
                </th>
                  <td>
                    <input type="hidden" id="id"/>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                    />
                  </td>
              </tr>
              <tr>
                <th>
                  Marks
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="marks"
                    pattern="^[0-9]*$"
                    title="Pls enter numbers only"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan='2' align="center" className="pad-4">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Submit"
                  />&nbsp;
                  <input type="reset" className="btn btn-secondary" onClick= {clearTextBoxAndClass} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}
function clearTextBoxAndClass(){
  $('#name').val('');
  $('#marks').val('');
  $('#id').val('');
  $('#sortName').addClass('fa-chevron-down').removeClass('fa-chevron-up').css('color', 'black');
  $('#sortMarks').addClass('fa-chevron-down').removeClass('fa-chevron-up').css('color', 'black');
}
export default StudentForm
