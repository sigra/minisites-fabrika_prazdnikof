module FabrikaPrazdnikof
  class Admin::PhotosController < AdminController
    def create
      photo = Photo.create(photo_params)
      redirect_to admin_root_path(gallery: photo.key)
    end

    def destroy
      photo = Photo.find(params[:id])
      photo.destroy

      redirect_to admin_root_path(gallery: photo.key)
    end

    private

    def photo_params
      params.require(:photo).permit(:key, :image)
    end
  end
end
