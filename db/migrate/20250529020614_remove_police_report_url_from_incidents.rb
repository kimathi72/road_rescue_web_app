class RemovePoliceReportUrlFromIncidents < ActiveRecord::Migration[7.0]
  def change
    remove_column :incidents, :police_report_url, :text
  end
end
