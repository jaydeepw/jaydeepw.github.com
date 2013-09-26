package com.example.todolistcheatsheet;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class TodoSQLiteHelper extends SQLiteOpenHelper {

  private static final String DATABASE_NAME = "todo.db";
  private static final int DATABASE_VERSION = 1;

  // Database creation sql statement
  // "create table todo_list (_id integer primary key autoincrement, item text not null);
  private static final String CREATE_TABLE_TODO_LIST = "create table "
      + Constants.TABLE_TODO_LIST + "(" + Constants.COL_ID + " integer primary key autoincrement, " 
		 	+ Constants.COL_ITEM + " text not null);";

  public TodoSQLiteHelper(Context context) {
    super(context, DATABASE_NAME, null, DATABASE_VERSION);
  }

  @Override
  public void onCreate(SQLiteDatabase database) {
    database.execSQL(CREATE_TABLE_TODO_LIST);
  }

  @Override
  public void onUpgrade( SQLiteDatabase db, int oldVersion, int newVersion ) {
    Log.w( TodoSQLiteHelper.class.getName(), "Upgrading database from version " + oldVersion + " to " + newVersion + ", which will destroy all old data" );
    db.execSQL("DROP TABLE IF EXISTS " + Constants.TABLE_TODO_LIST);
    onCreate(db);
  }

} 