import { MainBanner } from "../models/MainBannerModel";
import { uploadImage } from "../services/uploadImage";

export const getBanner = async (req, res) => {
    try {
        const banner = await MainBanner.find({});
        res.status(200).json({
            data: banner
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const createBanner = async (req, res) => {
  try {
    uploadImage.single("banner")(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" });
      }
      const { filename } = req.file;

      if (!filename) {
        return res.status(400).json({ message: "Không tìm thấy ảnh tải lên" });
      }

      const uploadBanner = await MainBanner.create({
        image: filename,
      });
      res
        .status(200)
        .json({ data: uploadBanner, message: "Thành công" });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    uploadImage.single("banner")(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" });
      }
      const {id} = req.params;
      const { filename } = req.file;

      if (!filename) {
        return res.status(400).json({ message: "Không tìm thấy ảnh tải lên" });
      }

      const uploadBanner = await MainBanner.findByIdAndUpdate({_id: id},{
        image: filename,
      });
      res
        .status(200)
        .json({ data: uploadBanner, message: "Thành công" });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
