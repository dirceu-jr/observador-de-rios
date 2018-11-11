ActiveAdmin.register Photo do
    permit_params :station_id, :file

    show do |photo|
        attributes_table do
            row :id
            row :station
            row :file do
                image_tag(photo.file.url)
            end
            active_admin_comments
        end
    end

    index do
        selectable_column
        id_column
        column :station
        column :file do |file|
            image_tag(file.file.thumb.url)
        end
        actions
    end

end
