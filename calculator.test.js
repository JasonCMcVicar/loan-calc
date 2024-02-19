it('should calculate monthly rate', function () {
//  expect(calcForm.elements["loan-amount"].value).toEqual('10000');
  expect(calcMonthlyPayment(10000, 10, 4.5)).toBe('103.64');
});
