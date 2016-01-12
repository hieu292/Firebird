11/1/2016:
# Tìm hiểu Bluebird:
Source Code: index.js
 Bluebird cho phép lập trình viên Nodejs sử dụng Promises để quản lý code không đồng bộ.
 Các hàm hay sử dụng:

# promisifyAll(): Chuyển tất cả các hàm trong một module sang dạng Promises.
** Task 1: Đọc một file (json) sử dụng promisifyAll();

# promisify(): Chuyển các hàm sang dạng Promises.
** Task 2: Đọc một file (json) sử dụng promisify();

# new promises
** Task 3: tạo một hàm mà hàm này trả về một promises chứa 2 hàm fullfill và reject.
 Nếu thành công thì gọi hàm fullfill, nếu error thì gọi hàm reject.

** Task 3.1: Sử dụng promises đề lấy ip và dữ liệu địa lý từ ip đó.
** Task 3.2: Sử dụng promises để lấy ip và lưu vào một file.

# map
**Task 4: So sánh giữa promise.map và array.map

# spread
** Task 5: Trả về nhiều hơn promises (mảng promises)

# map, concurrency
note: all chỉ nhận vào một mảng promise, còn map thì nhận vào một mảng bất kỳ, concurrency thì giới hạn tối đa bao nhiêu promise được hoàn thành (fullfill) cùng một thời điểm.
** Task 6: lấy ảnh sử dụng map, concurrency.

# some
note: some khởi đầu với nhiều promise  sau đó some sẽ đếm các fullfill promises trả về (promises hoàn thành), sau đó some trả về các promises theo thứ tự hoàn thành sớm nhất
** Task 7: sử dụng tcp-ping trả về 2 fullfill promises hoàn thành sớm nhất

# 




