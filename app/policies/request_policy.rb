class RequestPolicy < ApplicationPolicy
  # NOTE: Up to Pundit v2.3.1, the inheritance was declared as
  # `Scope < Scope` rather than `Scope < ApplicationPolicy::Scope`.
  # In most cases the behavior will be identical, but if updating existing
  # code, beware of possible changes to the ancestors:
  # https://gist.github.com/Burgestrand/4b4bc22f31c8a95c425fc0e30d7ef1f5

  def index?
    user.is_driver? || user.is_admin? || user.is_assessor? || user.is_insurer?
  end

  def new?
    user.is_driver?
  end

  def create?
    user.is_driver?
  end

  def show?
    user.is_assessor? || user.is_admin? || request.user == current_user? || user.is_insurer?
  end

  def update?
    user.is_assessor? || user.is_insurer? || request.user == current_user?
  end

  def destroy?
    user.is_admin? || request.user == current_user?
  end
end
