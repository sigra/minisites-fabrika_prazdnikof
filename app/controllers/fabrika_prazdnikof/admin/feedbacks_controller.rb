module FabrikaPrazdnikof
  class Admin::FeedbacksController < AdminController
    def create
      Feedback.create(feedback_params)
      redirect_to admin_root_path
    end

    def destroy
      feedback = Feedback.find(params[:id])
      feedback.destroy

      redirect_to admin_root_path
    end

    private

    def feedback_params
      params.require(:feedback).permit(:author, :text)
    end
  end
end
