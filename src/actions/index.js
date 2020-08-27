import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch,getState) => {
    await dispatch(fetchPosts());
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
}

export const fetchPosts = () =>
     async dispatch => {
        function onSuccess(success) {
            dispatch({type: 'FETCH_POSTS', payload: success.data});
            return success;
        }

        function onError(error) {
            dispatch({type: 'ERROR_GENERATED', error});
            return error;
        }
        try {
            const success = await jsonPlaceholder.get('/posts');
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }

}
/*export const fetchUser = (id) => dispatch => _fetchUser(id,dispatch);

const _fetchUser = _.memoize(async (id,dispatch) => {
    function onSuccess(success) {
        dispatch({type: 'FETCH_USER', payload: success.data});
        return success;
    }

    function onError(error) {
        dispatch({type: 'ERROR_GENERATED', error});
        return error;
    }

    try {
        const success = await jsonPlaceholder.get(`/users/${id}`);
        return onSuccess(success);
    } catch (error) {
        return onError(error);
    }
});*/

export const fetchUser = (id) => async dispatch => {
    function onSuccess(success) {
        dispatch({type: 'FETCH_USER', payload: success.data});
        return success;
    }

    function onError(error) {
        dispatch({type: 'ERROR_GENERATED', error});
        return error;
    }

    try {
        const success = await jsonPlaceholder.get(`/users/${id}`);
        return onSuccess(success);
    } catch (error) {
        return onError(error);
    }
}

