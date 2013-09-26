package com.learning.service;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.support.v4.app.NavUtils;

public class MainActivity extends Activity {

	private static final String TAG = "MainActivity";
	
	private Button mStartService;
	private Button mStopService;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        initStartService();
        initStopService();
    }

	private void initStartService() {
		mStartService = (Button) findViewById(R.id.start_service);
		
		mStartService.setOnClickListener( new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				Log.i(TAG, "intiStartService");
				
				Intent serviceStartIntent = new Intent(MainActivity.this, ServiceDemo.class);
				startService(serviceStartIntent);
			}
		});
	}
	
	private void initStopService() {
		mStopService = (Button) findViewById(R.id.stop_service);
		
		mStopService.setOnClickListener( new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				Log.i(TAG, "intiStopService");
				
				Intent serviceStopIntent = new Intent(MainActivity.this, ServiceDemo.class);
				stopService(serviceStopIntent);
			}
		});
	}
}
