module FabrikaPrazdnikof
  class Admin::PagesController < AdminController
    def update
      @page = Page.find(params[:id])
      @page.update_attributes(page_params)

      redirect_to admin_root_path(page: @page.key)
    end

    private

    def page_params
      params.require(:page).permit(:text)
    end
  end
end
