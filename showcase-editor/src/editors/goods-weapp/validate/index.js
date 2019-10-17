import goodsValidate from './goods';
import tagListValidate from './tag-list';

export default value => {
  let errors = {};
  const {
    type,
    corner_mark_type: cornerMarkType,
    show_corner_mark: showCornerMark,
    corner_mark_image: cornerMarkImage,
  } = value;

  const isTagListComponents = type === 'tag_list_top' || type === 'tag_list_left';

  if (isTagListComponents) {
    errors = tagListValidate(value);
  } else {
    errors = goodsValidate(value);
  }
  // 角标判断
  if (showCornerMark === '1' && cornerMarkType === '4') {
    if (!cornerMarkImage) {
      errors.corner_mark_image = '请上传角标图片';
    }
  }

  return errors;
};
