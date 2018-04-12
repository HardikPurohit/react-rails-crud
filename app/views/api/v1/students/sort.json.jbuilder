json.array!(@students) do |student|
  json.extract! student, :id, :name, :marks
end
