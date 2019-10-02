window.theme = window.theme || {};
theme.customerTemplates = (function() {

  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }

  return {
    init: function() {
      resetPasswordSuccess();
    }
  };
})();

theme.init = function() {
  theme.customerTemplates.init();
};

$(theme.init);
