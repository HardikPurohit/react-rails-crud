class Api::V1::StudentsController < ApplicationController
  before_action :find_student, only: %i[update destroy edit]
  def index
    @students = Student.order(created_at: :desc).page(params[:page]).per(10)
    @total_count = @students.total_count
    @total_pages = @students.total_pages
  end

  def create
    @student = Student.new(student_params)
    respond_to do |format|
      if @student.save
        format.json { render json: { status: :ok } }
      else
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    respond_to do |format|
      format.json { render json: @student.to_json }
    end
  end

  def update
    if @student.update(student_params)
      respond_to do |format|
        format.json { render json: { status: :ok } }
      end
    else
      respond_to do |format|
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  def sort
    @students = Student.where(id: params[:recordsIds]).order("#{params[:sort_by]} #{params[:sort_order]}")
     respond_to do |format|
      format.json { render 'index'}
    end
  end

  def destroy
    @student.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def student_params
    params.require(:student).permit(:name, :marks)
  end

  def find_student
    @student = Student.find(params[:id])
  end
end
