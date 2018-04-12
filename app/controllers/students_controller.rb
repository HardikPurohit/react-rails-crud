class StudentsController < ApplicationController
  def index
    @students = Student.order(created_at: :desc).page(params[:page]).per(10)
    @total_count = @students.total_count
    @total_pages = @students.total_pages
    # @students = Student.all
  end
end
