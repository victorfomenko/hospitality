import { connect } from 'react-redux';
import * as categoriesDux from '../../../../dux/categories/categoriesDux';
import { IAppState } from '../../../../dux/duxRoot';
import * as initDux from '../../../../dux/init/initDux';
import CategoriesPage from './CategoriesPage';

const mapStateToProps = (state: IAppState) => ({
  categories: initDux.categoriesSelector(state),
});

const mapDispatch = {
  saveCategory: categoriesDux.change,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(CategoriesPage);
