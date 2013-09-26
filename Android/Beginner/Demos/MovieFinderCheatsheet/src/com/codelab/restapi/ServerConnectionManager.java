package com.codelab.restapi;

import java.net.URLEncoder;
import java.util.HashMap;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.codelab.moviefindercheatsheet.Constants;

import android.util.Base64;
import android.util.Log;

public class ServerConnectionManager {
	
	private static final String TAG = "ServerConnectionManager";
	
	
	private static final String API_URL = "http://api.rottentomatoes.com/api/public/v1.0";
	
	
	public boolean searchMovie(String movieName, HashMap<String, String> outPut){
		
		HttpClient client = new DefaultHttpClient();
		String response = null;
		int httpStatus = -1;
	    
	    
		try {
		    String getURL = API_URL + "/movies.json?apikey=" + Constants.MOVIE_FINDER_API_KEY + "&q=" + URLEncoder.encode(movieName) + "&page_limit=1";
		    HttpGet get = new HttpGet( getURL );
		    HttpResponse responseGet = client.execute(get);  
		    HttpEntity resEntityGet = responseGet.getEntity();
		    httpStatus = responseGet.getStatusLine().getStatusCode();
		    
		    if( httpStatus == HttpStatus.SC_OK ){
		    	if (resEntityGet != null) {  
			        // do something with the response
			         response = EntityUtils.toString(resEntityGet);
			        Log.v(TAG, response);
			    }	
		    }else{
		    	if( httpStatus == HttpStatus.SC_UNAUTHORIZED ){
		    		Log.e(TAG, "#searchMovie Amm... Unauthorized to access this API.");
		    		return false;	
		    	}
		    	if( httpStatus == HttpStatus.SC_INTERNAL_SERVER_ERROR ){
		    		Log.e(TAG, "#searchMovie Internal server error.");
		    		return false;
		    	}
		    }
		    
		} catch (Exception e) {
		    e.printStackTrace();
		    Log.e(TAG, "#searchMovie Exception msg: " + e.getMessage() );
		    return false;
		} finally{
			// important thing, easy to forget.
			client.getConnectionManager().shutdown();
		}
		
		// parse the response
		JSONObject respJSONObj = null;
		JSONArray movieArr = null;
		try {
			 respJSONObj = new JSONObject(response);
			 String error = respJSONObj.has("error") ? respJSONObj.getString("error") : null;
			 
			if( error != null ) {outPut.put("error", error); return false;};
		} catch (JSONException e) {
			e.printStackTrace();
			Log.e(TAG, "#searchMovie JSONException while parsing response from the server " + e.getMessage() );
		} catch (Exception e) {
			e.printStackTrace();
			Log.e(TAG, "#searchMovie Exception while parsing response from the server " + e.getMessage() );
		}
		
		try {
			movieArr = respJSONObj.has("movies") ? respJSONObj.getJSONArray("movies") : null;
			
			// consider only the first movie result that has been returned.
			// Skip others.
			if(movieArr != null && movieArr.length() > 0){
				JSONObject movieInfo = (JSONObject) movieArr.get(0);
				// Using JSON keys this way is real bad.
				String title = movieInfo.has("title") ? movieInfo.getString("title") : null;
				String year = movieInfo.has("year") ? movieInfo.getString("year") : null;
				String runtime = movieInfo.has("runtime") ? movieInfo.getString("runtime") : null;
				String synopsis = movieInfo.has("synopsis") ? movieInfo.getString("synopsis") : null;

				JSONObject posters = movieInfo.has("posters") ? movieInfo.getJSONObject("posters") : null;
				String imageUrl = posters.has("thumbnail") ? posters.getString("thumbnail") : null;
				
				if( title != null ) outPut.put("title", title);
				if( year != null ) outPut.put("year", year);
				if( runtime != null ) outPut.put("runtime", runtime);
				if( synopsis != null ) outPut.put("synopsis", synopsis);
				if( imageUrl != null ) outPut.put("image_url", imageUrl);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return true;
	}
	
	public byte[] fetchImage(String imageUrl){
		
		HttpClient client = new DefaultHttpClient();
		String response = null;
		int httpStatus = -1;
	    
	    
		try {
		    String getURL = imageUrl;
		    HttpGet get = new HttpGet( getURL );
		    HttpResponse responseGet = client.execute(get);  
		    HttpEntity resEntityGet = responseGet.getEntity();
		    httpStatus = responseGet.getStatusLine().getStatusCode();
		    
		    if( httpStatus == HttpStatus.SC_OK ){
		    	if (resEntityGet != null) {
			        // do something with the response
			         response = EntityUtils.toString(resEntityGet);
			        Log.v(TAG, response);
			    }	
		    }else{
		    	
		    	if( httpStatus == HttpStatus.SC_UNAUTHORIZED ){
		    		Log.e(TAG, "#fetchImage Amm... Unauthorized to access this API.");
		    		return null;
		    	}

		    	if( httpStatus == HttpStatus.SC_INTERNAL_SERVER_ERROR ){
		    		Log.e(TAG, "#fetchImage Internal server error.");
		    		return null;
		    	}
		    }
		    
		} catch (Exception e) {
		    e.printStackTrace();
		    Log.e(TAG, "#fetchImage Exception msg: " + e.getMessage() );
		    return null;
		} finally{
			// important thing, easy to forget.
			client.getConnectionManager().shutdown();
		}

		return response.getBytes();
	}

}