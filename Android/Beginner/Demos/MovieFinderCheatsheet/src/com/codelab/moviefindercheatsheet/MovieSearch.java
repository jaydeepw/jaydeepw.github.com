package com.codelab.moviefindercheatsheet;

import java.util.HashMap;

import com.codelab.restapi.ServerConnectionManager;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.BitmapFactory.Options;
import android.text.Editable;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class MovieSearch extends Activity {
	
	private static final String TAG = "MovieSearch";
	
	private Button mSearchButton;
	private EditText mSearchEditText;
	
	private TextView mTitle;
	private TextView mYear;
	private TextView mRuntime;
	private TextView mSynopsis;
	private ImageView mMoviePoster;
	
	private static final int ERROR = 0;
	private static final int SUCCESS = 1;
	private static final int IMAGE_READY = 2;
	private static final int IMAGE_FAILED = 3;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.movie_search);
        
        mSearchEditText = (EditText) findViewById(R.id.search_box);
        
        mTitle = (TextView) findViewById(R.id.movie_title);
        mYear = (TextView) findViewById(R.id.movie_year);
        mRuntime = (TextView) findViewById(R.id.movie_runtime);
        mSynopsis = (TextView) findViewById(R.id.movie_synopsis);
        mMoviePoster = (ImageView) findViewById(R.id.movie_thumbnail);
        
        initSearchButton();
    }

	private void initSearchButton() {
		mSearchButton = (Button) findViewById(R.id.search_button);

		mSearchButton.setOnClickListener( new View.OnClickListener() {
			
			public void onClick(View v) {
				String movieName = mSearchEditText.getText().toString();
				searchMovie(movieName);
			}
		});
	}
	
	private Handler mHandler = new Handler(new Handler.Callback() {
		
		public boolean handleMessage(Message msg) {
			
			Bundle b = msg.getData();
			
			switch (msg.what) {
				case SUCCESS:
					String title = (String) b.get("title");
					String year = (String) b.get("year");
					String runtime = (String) b.get("runtime");
					String synopsis = (String) b.get("synopsis");
					String imageUrl = (String) b.get("image_url");
					Log.i(TAG, "#handleMessage imageUrl: " + imageUrl);
					showMovieInfo(title, year, runtime, synopsis, imageUrl);
					break;
					
				case ERROR:
					String error = (String) b.get("error");
					Toast.makeText(MovieSearch.this, error, Toast.LENGTH_SHORT).show();
					break;
					
				case IMAGE_READY:
					showMovieThumbnail(b.getByteArray("image_data"));
					break;
					
				case IMAGE_FAILED:
					Toast.makeText(MovieSearch.this, "Image download failed.", Toast.LENGTH_SHORT).show();
					break;
	
				default:
					break;
			}

			return false;
		}
	});
	
	private void showMovieInfo(String title, String year, String runtime, String synopsis, String imageUrl) {
		mTitle.setText(title);
		mYear.setText(year);
		mRuntime.setText(runtime + " min");
		mSynopsis.setText(synopsis);
		
		fetchImage(imageUrl);
	}
	
	protected void showMovieThumbnail(byte[] imageData) {
		//Bitmap movieImage = BitmapFactory.decodeByteArray(imageData, 0, imageData.length);
		BitmapFactory.Options opt = new BitmapFactory.Options();
		opt.inDither = false;
		opt.inPreferredConfig = Bitmap.Config.RGB_565;
		Bitmap movieImage = BitmapFactory.decodeByteArray(imageData, 0, imageData.length, opt);
		mMoviePoster.setImageBitmap(movieImage);
	}

	private void fetchImage(final String imageUrl) {
		Thread imageDownloader = new Thread(new Runnable() {
			
			public void run() {
				ServerConnectionManager servConnMgr = new ServerConnectionManager();
				
				byte[] imageData = servConnMgr.fetchImage(imageUrl);
				
				Message msg = new Message();
				Bundle b = new Bundle();
				
				if( imageData != null ){
					msg.what = IMAGE_READY;
					b.putByteArray("image_data", imageData );
				}else{
					msg.what = IMAGE_FAILED;
					b.putString("message", "Sorry, no image available.");
				}
				
				msg.setData(b);
				mHandler.sendMessage(msg);
			}
		});
		
		imageDownloader.start();
	}

	private void searchMovie(final String movieName) {
		
		Thread movieFinderThread = new Thread(new Runnable() {
			
			public void run() {
				ServerConnectionManager servConnMgr = new ServerConnectionManager();
				HashMap<String, String> outPut = new HashMap<String, String>();
				
				servConnMgr.searchMovie(movieName, outPut);
				
				Message msg = new Message();
				Bundle b = new Bundle();
				
				if( outPut.containsKey("error") ){
					Log.e(TAG, "#searchMovie error receiving response from the server.");
					
					msg.what = ERROR;
					
					b.putString("error", outPut.get("error") );
					b.putString("message", outPut.get("message") );
				} else{ // successful
					
					String title = null;
					String year = null;
					String runtime = null;
					String synopsis = null;
					String imageUrl = null;
					
					if( outPut.containsKey("title") ) 		{ title = outPut.get("title"); }
					if( outPut.containsKey("year") ) 		{ year = outPut.get("year"); }
					if( outPut.containsKey("runtime") ) 	{ runtime = outPut.get("runtime"); }
					if( outPut.containsKey("synopsis") ) 	{ synopsis = outPut.get("synopsis"); }
					if( outPut.containsKey("image_url") ) 	{ imageUrl = outPut.get("image_url"); }
					
					msg.what = SUCCESS;
					
					b.putString("title", title );
					b.putString("year", year );
					b.putString("runtime", runtime );
					b.putString("synopsis", synopsis );
					b.putString("image_url", imageUrl );
					
				}
				
				msg.setData(b);
				mHandler.sendMessage(msg);
			}
		});
		
		movieFinderThread.start();

	}
}